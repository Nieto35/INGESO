<?php

namespace Pos\Auth\Domain\ValueObject;

use Pos\Auth\Domain\Exception\InvalidArgumentException;

class UserEmail
{
    private string $email;


    /**
     * @throws InvalidArgumentException
     */
    public function __construct(string $email)
    {
        if (empty($email)) {
            throw new InvalidArgumentException("El correo electrónico no puede estar vacío.");
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("El formato del correo electrónico es inválido.");
        }

        $this->email = $email;
    }

    public function toString(): string
    {
        return $this->email;
    }


}
