<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CollaborationRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $senderName;
    public $acceptUrl;


    /**
     * Create a new message instance.
     */
    public function __construct($senderName, $acceptUrl)
    {
        $this->senderName = $senderName;
        $this->acceptUrl = $acceptUrl;
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Collaboration Request Mail',
        );
    }


    public function build()
    {
        return $this->subject('Collaboration Request')
                    ->markdown('mail.editor-invite')
                    ->with([
                        'senderName' => $this->senderName,
                        'acceptUrl' => $this->acceptUrl,
                    ]);
    }
    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.editor-invite',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
