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
            // Drop the existing foreign key and column
            $table->dropForeign(['creator_id']);
            $table->dropColumn('creator_id');

            // Add the correct foreign key referencing files.user_id
            $table->unsignedBigInteger('creator_id')->nullable();
            $table->foreign('creator_id')->references('user_id')->on('files')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $table->dropForeign(['creator_id']);
            $table->dropColumn('creator_id');

            $table->unsignedBigInteger('creator_id')->nullable();
            $table->foreign('creator_id')->references('id')->on('files')->onDelete('cascade');
    }
};
