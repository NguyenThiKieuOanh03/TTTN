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
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');
            $table->string('delivery_name', 255);
            $table->string('delivery_gender', 255);
            $table->string('delivery_email', 255);
            $table->string('delivery_phone', 255);
            $table->string('delivery_address', 1000);
            $table->string('note', 1000);
            $table->timestamps(); //created_at, updated_at
            $table->unsignedInteger('created_by')->default(1);
            $table->unsignedInteger('updated_by')->nullable();
            $table->unsignedTinyInteger('status')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order');
    }
};
