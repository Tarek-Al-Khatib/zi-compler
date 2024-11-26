<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class OpenAIController extends Controller
{
    public function debugCode(Request $request){

        $client = new Client();
        $response = $client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a code debugger. Your task is to provide hints to any code provided to you in Python or other programming languages.',
                    ],
                    [
                        'role' => 'user',
                        'content' => $request->code,
                    ],
                ],
                'temperature' => 0.7,
            ],
        ]);

        $responseBody = json_decode($response->getBody(), true);
        return response()->json($responseBody);

    }
}
