<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use GuzzleHttp\Client;
use Exception;

class VerifyClerkToken
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function handle(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');
        
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return response()->json([
                'error' => 'Token de autorización requerido'
            ], 401);
        }

        $token = substr($authHeader, 7); // Remover "Bearer "

        try {
            // Obtener las claves públicas de Clerk
            $jwks = $this->getClerkJWKS();
            
            // Decodificar el header del JWT para obtener el kid
            $header = json_decode(base64_decode(str_replace('_', '/', str_replace('-', '+', explode('.', $token)[0]))), true);
            
            if (!isset($header['kid'])) {
                throw new Exception('Token inválido: no se encontró kid en el header');
            }

            // Buscar la clave pública correspondiente
            $publicKey = $this->findPublicKey($jwks, $header['kid']);
            
            if (!$publicKey) {
                throw new Exception('Clave pública no encontrada para el kid: ' . $header['kid']);
            }

            // Verificar el token
            $decoded = JWT::decode($token, new Key($publicKey, 'RS256'));
            
            // Agregar la información del usuario al request
            $request->merge([
                'user_id' => $decoded->sub,
                'user_data' => $decoded
            ]);

            return $next($request);

        } catch (Exception $e) {
            \Log::error('Error verificando token de Clerk: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Token inválido',
                'message' => $e->getMessage()
            ], 401);
        }
    }

    private function getClerkJWKS()
    {
        $response = $this->client->get('https://api.clerk.dev/v1/jwks');
        return json_decode($response->getBody(), true);
    }

    private function findPublicKey($jwks, $kid)
    {
        foreach ($jwks['keys'] as $key) {
            if ($key['kid'] === $kid) {
                return $this->convertJWKToPEM($key);
            }
        }
        return null;
    }

    private function convertJWKToPEM($jwk)
    {
        // Esta función convierte una clave JWK a formato PEM
        // Para RSA keys
        if ($jwk['kty'] !== 'RSA') {
            throw new Exception('Tipo de clave no soportado: ' . $jwk['kty']);
        }

        $n = $this->base64UrlDecode($jwk['n']);
        $e = $this->base64UrlDecode($jwk['e']);

        // Construcción básica del ASN.1 para RSA
        $rsa = pack('Ca*a*', 2, $this->encodeLength(strlen($n)), $n) .
               pack('Ca*a*', 2, $this->encodeLength(strlen($e)), $e);
        
        $rsaSequence = pack('Ca*a*', 48, $this->encodeLength(strlen($rsa)), $rsa);
        
        $algorithmIdentifier = pack('H*', '300d06092a864886f70d0101010500');
        $publicKey = pack('Ca*a*', 3, $this->encodeLength(strlen($rsaSequence) + 1), chr(0) . $rsaSequence);
        
        $der = pack('Ca*a*a*', 48, $this->encodeLength(strlen($algorithmIdentifier) + strlen($publicKey)), $algorithmIdentifier, $publicKey);
        
        $pem = "-----BEGIN PUBLIC KEY-----\n" .
               chunk_split(base64_encode($der), 64, "\n") .
               "-----END PUBLIC KEY-----\n";
        
        return $pem;
    }

    private function base64UrlDecode($data)
    {
        return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
    }

    private function encodeLength($length)
    {
        if ($length < 0x80) {
            return chr($length);
        }
        $temp = ltrim(pack('N', $length), chr(0));
        return pack('Ca*', 0x80 | strlen($temp), $temp);
    }
}
