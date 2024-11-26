<?php


namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class FileContentUpdated implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $fileId;
    public $content;
    public $cursorPosition;
    public $userId;

    public function __construct($fileId, $content, $cursorPosition, $userId)
    {
        $this->fileId = $fileId;
        $this->content = $content;
        $this->cursorPosition = $cursorPosition;
        $this->userId = $userId;
    }

    public function broadcastOn()
    {
        return new Channel('file.' . $this->fileId);
    }
}
