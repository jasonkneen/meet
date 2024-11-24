import React from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MonitorUp,
  Share2,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';

interface ControlsProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isScreenSharing: boolean;
  isChatOpen?: boolean;
  isParticipantsOpen?: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleScreenShare: () => void;
  onDisconnect: () => void;
  onShareLink?: () => void;
  onToggleChat?: () => void;
  onToggleParticipants?: () => void;
  onOpenSettings?: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  isVideoEnabled,
  isAudioEnabled,
  isScreenSharing,
  isChatOpen,
  isParticipantsOpen,
  onToggleVideo,
  onToggleAudio,
  onToggleScreenShare,
  onDisconnect,
  onShareLink,
  onToggleChat,
  onToggleParticipants,
  onOpenSettings,
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 glass-effect px-8 py-4 rounded-full">
      <div className="flex items-center gap-4">
        {/* Main Controls */}
        <div className="flex items-center gap-4 border-r border-white/10 pr-4">
          <button
            onClick={onToggleVideo}
            className={`metal-button ${!isVideoEnabled && 'bg-red-500/80 hover:bg-red-600/80'}`}
            title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoEnabled ? (
              <Video className="w-5 h-5 text-white" />
            ) : (
              <VideoOff className="w-5 h-5 text-white" />
            )}
          </button>
          
          <button
            onClick={onToggleAudio}
            className={`metal-button ${!isAudioEnabled && 'bg-red-500/80 hover:bg-red-600/80'}`}
            title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isAudioEnabled ? (
              <Mic className="w-5 h-5 text-white" />
            ) : (
              <MicOff className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={onToggleScreenShare}
            className={`metal-button ${isScreenSharing && 'bg-green-500/80 hover:bg-green-600/80'}`}
            title={isScreenSharing ? 'Stop sharing screen' : 'Share screen'}
          >
            <MonitorUp className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center gap-4">
          {onShareLink && (
            <button
              onClick={onShareLink}
              className="metal-button"
              title="Share meeting link"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
          )}

          {onToggleChat && (
            <button
              onClick={onToggleChat}
              className={`metal-button ${isChatOpen && 'bg-blue-500/80 hover:bg-blue-600/80'}`}
              title={isChatOpen ? 'Close chat' : 'Open chat'}
            >
              <MessageSquare className="w-5 h-5 text-white" />
            </button>
          )}

          {onToggleParticipants && (
            <button
              onClick={onToggleParticipants}
              className={`metal-button ${isParticipantsOpen && 'bg-blue-500/80 hover:bg-blue-600/80'}`}
              title={isParticipantsOpen ? 'Close participants' : 'Show participants'}
            >
              <Users className="w-5 h-5 text-white" />
            </button>
          )}

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="metal-button"
              title="Open settings"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* Disconnect Button */}
        <div className="flex items-center gap-4 border-l border-white/10 pl-4">
          <button
            onClick={onDisconnect}
            className="metal-button bg-red-500/80 hover:bg-red-600/80"
            title="Leave call"
          >
            <PhoneOff className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
