<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class SendEmailService
{
    public function __construct(private MailerInterface $mailer) {}

    public function send(
        string $from,
        string $to,
        string $subject,
        string $html,
        array $context
    ): void {
        // On crée le mail
        $email = (new TemplatedEmail())
            ->from($from)
            ->to($to)
            ->subject($subject)
            ->html($html)
            ->context($context);

        // On envoie le mail
        $this->mailer->send($email);
    }
}
