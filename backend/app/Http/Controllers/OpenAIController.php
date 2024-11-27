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
                            'content' => 'You are a code recommender. 
                            Your task is to : \n- return the code eith error if found, on each line without changing anything , even the error dont change it\n
                            - over each line with error add a line that is commented for what you recommend for user \n
                            - note that you should not correct anything, just provide recommendations\n
                            - if no recommendations return comment of there is no recommendations on top with the code\n
                            ',
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
