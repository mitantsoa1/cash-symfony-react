<?php

namespace App\Controller\admin;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\SendEmailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class LoginController extends BaseController
{
    #[Route('/api/two_factor', name: 'two_factor')]
    public function index(Request $request, UserRepository $userRepository, SendEmailService $mailService): Response
    {
        $body = json_decode($request->getContent());
        $email = $body->email;
        $authCode = random_int(100000, 999999);

        $user = $userRepository->findOneBy(["email" => $email]);

        if ($user) {
            $user->setAuthCode($authCode);
            $this->save($user);

            $mailService->send("admin.cash@admin.com", $user->getEmail(), "authCode pour cash", $authCode, []);

            return $this->json(true);
        }
        return $this->json(false);
    }
    #[Route('/api/two_factor_check', name: 'two_factor_check')]
    public function check(Request $request, UserRepository $userRepository): Response
    {
        $body = json_decode($request->getContent());
        $email = $body->email;
        $authCode = $body->auth_code;

        $user = $userRepository->findOneBy(["email" => $email]);


        if ($user) {
            if ($authCode == $user->getAuthCode()) {
                return $this->json(true);
            }
        } else {
            return $this->json('KO');
        }
        return $this->json(false);
    }
}
