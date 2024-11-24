@component('mail::message')
# Collaboration Invitation

Hello,

You have received a collaboration invitation from {{ $senderName }}.

To accept the collaboration, please click the button below:

@component('mail::button', ['url' => $acceptUrl])
Accept Collaboration
@endcomponent

Thank you,<br>
{{ config('app.name') }}
@endcomponent
