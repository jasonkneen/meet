import {
  ChatMessage,
  ConnectionQualityIndicator,
  ConnectionState,
  ControlBar,
  DisconnectButton,
  MediaDeviceMenu,
  MessageFormatter,
  ParticipantName,
  RoomName,
  TrackMutedIndicator,
  VideoTrack,
  useLocalParticipant,
  useParticipants,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useCallback, useState } from 'react';
import Controls from './Controls';

export interface VideoConferenceProps {
  chatMessageFormatter?: MessageFormatter;
  SettingsComponent?: React.ComponentType;
}

export function CustomVideoConference({ chatMessageFormatter, SettingsComponent }: VideoConferenceProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();
  const tracks = useTracks();

  const isVideoEnabled = localParticipant?.isCameraEnabled ?? false;
  const isAudioEnabled = localParticipant?.isMicrophoneEnabled ?? false;
  const isScreenSharing = tracks.some((track) => track.source === Track.Source.ScreenShare);

  const handleToggleVideo = useCallback(() => {
    if (isVideoEnabled) {
      localParticipant?.setCameraEnabled(false);
    } else {
      localParticipant?.setCameraEnabled(true);
    }
  }, [localParticipant, isVideoEnabled]);

  const handleToggleAudio = useCallback(() => {
    if (isAudioEnabled) {
      localParticipant?.setMicrophoneEnabled(false);
    } else {
      localParticipant?.setMicrophoneEnabled(true);
    }
  }, [localParticipant, isAudioEnabled]);

  const handleToggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      await localParticipant?.stopScreenShare();
    } else {
      await localParticipant?.startScreenShare();
    }
  }, [localParticipant, isScreenSharing]);

  const handleShareLink = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Meeting link copied to clipboard!');
    });
  }, []);

  const handleDisconnect = useCallback(() => {
    localParticipant?.room?.disconnect();
  }, [localParticipant]);

  return (
    <div className="lk-video-conference">
      <div className="lk-video-grid">
        {participants.map((participant) => (
          <div key={participant.identity} className="lk-participant">
            <div className="lk-participant-metadata">
              <ParticipantName participant={participant} />
              <ConnectionQualityIndicator participant={participant} />
              <TrackMutedIndicator source={Track.Source.Microphone} participant={participant} />
              <TrackMutedIndicator source={Track.Source.Camera} participant={participant} />
            </div>
            <VideoTrack participant={participant} source={Track.Source.Camera} />
          </div>
        ))}
      </div>

      <Controls
        isVideoEnabled={isVideoEnabled}
        isAudioEnabled={isAudioEnabled}
        isScreenSharing={isScreenSharing}
        isChatOpen={isChatOpen}
        isParticipantsOpen={isParticipantsOpen}
        onToggleVideo={handleToggleVideo}
        onToggleAudio={handleToggleAudio}
        onToggleScreenShare={handleToggleScreenShare}
        onDisconnect={handleDisconnect}
        onShareLink={handleShareLink}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onToggleParticipants={() => setIsParticipantsOpen(!isParticipantsOpen)}
        onOpenSettings={SettingsComponent ? () => setIsSettingsOpen(!isSettingsOpen) : undefined}
      />

      {SettingsComponent && isSettingsOpen && <SettingsComponent />}
    </div>
  );
}
