<?php

namespace App\Controller\admin;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\SendEmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegisterController extends AbstractController
{

    #[Route('/registerAdmin', name: 'app_register')]
    public function index(UserPasswordHasherInterface $passwordHasherInterface, UserRepository $userRepository, EntityManagerInterface $em): Response
    {
        $admin          = $userRepository->findByroleadmin();

        // creation admin par defaut
        if (!$admin) {
            $user = new User();

            $user->setRoles(array('ROLE_ADMIN'));
            $user->setEmail('admin@admin.com');
            $passwordcyrpter = $passwordHasherInterface->hashPassword($user, '123456');
            $user->setPassword($passwordcyrpter);
            $user->setFullname("Admin");
            $user->setVerified(1);
            $em->persist($user);
            $em->flush();
        }
        return $this->render('base.html.twig');
    }
    #[Route('/mail', name: 'app_mail')]
    public function mail(SendEmailService $mailService): Response
    {
        $mailService->send("admin.cash@admin.com", 'user@user.com', "authCode pour cash", '$authCode', []);
        return $this->render('base.html.twig');
    }
}
