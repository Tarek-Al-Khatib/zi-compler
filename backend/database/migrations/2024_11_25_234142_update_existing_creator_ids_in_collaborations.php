<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('collaborations', function (Blueprint $table) {
            DB::table('collaborations')
            ->join('files', 'collaborations.file_id', '=', 'files.id')
            ->update(['collaborations.creator_id' => DB::raw('files.user_id')]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('collaborations', function (Blueprint $table) {
            DB::table('collaborations')
            ->update(['creator_id' => null]);
        });
    }
};
