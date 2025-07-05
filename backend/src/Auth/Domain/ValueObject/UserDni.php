<?php
namespace Pos\Auth\Domain\ValueObject;

use Pos\Auth\Domain\Exception\InvalidArgumentException;

class UserDni
{
    private string $id;

    /**
     * @throws InvalidArgumentException
     */
    public function __construct(string $id)
    {
        if (strlen($id) !== 9) {
            throw new InvalidArgumentException("El DNI proporcionado debe tener exactamente 9 caracteres: $id");
        }

        $this->id = $id;
    }

    public function toString(): string
    {
        return $this->id;
    }
}
