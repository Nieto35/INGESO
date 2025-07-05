<?php

namespace Pos\Auth\Infrastructure\Repository;

use Exception;
use Illuminate\Database\QueryException;
use Pos\Auth\Domain\Entity\User;
use Pos\Auth\Domain\Exception\ExistUserException;
use Pos\Auth\Domain\Exception\UserNotFoundException;
use Pos\Auth\Domain\Repository\UserRepository;
use App\Models\User as EloquentUser;
use Pos\Auth\Domain\ValueObject\UserDni;

class UserRepositoryEloquent implements UserRepository
{
    public function create(User $user): void
    {
        EloquentUser::create([
            'dni' => $user->getId()->toString(),
            'email' => $user->getEmail()->toString(),
            'name' => $user->getName()->toString(),
            'birth_date' => $user->getBirthDate()->format('Y-m-d'),
            'phone' => $user->getPhone()->toString(),
        ]);
    }

    public function getAll(int $page, ?string $search = null): array
    {
        $query = EloquentUser::query();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('dni', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('birth_date', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        return $query->paginate(10, ['*'], 'page', $page)->toArray();
    }

    /**
     * @throws ExistUserException
     */
    public function existUser(UserDni $dni): void
    {
        $user = EloquentUser::where('dni', $dni->toString())->first();

        if ($user) {
            throw new ExistUserException("User with DNI {$dni->toString()} already exists.");
        }
    }

    /**
     * @throws UserNotFoundException
     */
    public function update(User $user): void
    {
        $eloquentUser = EloquentUser::where('dni', $user->getId()->toString())->first();

        if (!$eloquentUser) {
            throw new UserNotFoundException("User with DNI {$user->getId()->toString()} not found.");
        }
        $eloquentUser->update([
            'email' => $user->getEmail()->toString(),
            'name' => $user->getName()->toString(),
            'birth_date' => $user->getBirthDate()->format('Y-m-d'),
            'phone' => $user->getPhone()->toString(),
        ]);
    }
}
