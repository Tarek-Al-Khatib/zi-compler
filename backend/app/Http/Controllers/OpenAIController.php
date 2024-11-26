<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class OpenAIController extends Controller
{
    public function debugCode(Request $request)
    {
        try {
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
                            'content' => 'You are a code debugger. Your task is to : \n1) return the code as it was on each line\n
                            2) highlight the line with the errorin red \n
                            3) highlight the line with the recommendation or warning in yellow.',
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
        } catch (Exception $e) {
            return response()->json(['error' => 'Message: ' . $e->getMessage()], 500);
        }
    }
}
