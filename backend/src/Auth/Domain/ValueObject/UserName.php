<?php

namespace Pos\Auth\Domain\ValueObject;

use Pos\Auth\Domain\Exception\InvalidArgumentException;

class UserName
{

    private string $name;

    /**
     * @throws InvalidArgumentException
     */
    public function __construct(string $name)
    {
        if (empty($name)) {
            throw new InvalidArgumentException("El nombre de usuario no puede estar vacío.");
        }
        if (strlen($name) < 3 || strlen($name) > 50) {
            throw new InvalidArgumentException("El nombre de usuario debe tener entre 3 y 50 caracteres.");
        }

        $this->name = $name;
    }

    public function toString(): string
    {
        return $this->name;
    }

}
