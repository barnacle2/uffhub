<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {  
            $table->id(); // Primary key for products
            $table->string('name');
            $table->string('image')->nullable();
            $table->decimal('price', 8, 2);
            $table->string('seller_name'); // Replace category_id with seller_name
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
