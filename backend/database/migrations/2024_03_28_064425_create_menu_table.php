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
        Schema::create('menu', function (Blueprint $table) {
            $table->id(); //id
            $table->string('name', 1000);
            $table->string('link', 1000);
            $table->unsignedInteger('sort_order')->default(0);
            $table->unsignedInteger('parent_id')->default(0);
            $table->string('type', 100)->nullable();
            $table->unsignedInteger('table_id')->default(0);
            $table->string('position', 1000);
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
        Schema::dropIfExists('menu');
    }
};
