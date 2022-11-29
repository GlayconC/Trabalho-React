<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Alunos

Route::get('students', 'App\Http\Controllers\ApiController@getAllStudents');
Route::get('students/{id}', 'App\Http\Controllers\ApiController@getStudent');
Route::post('students', 'App\Http\Controllers\ApiController@createStudent');
Route::put('students/{id}', 'App\Http\Controllers\ApiController@updateStudent');
Route::delete('students/{id}','App\Http\Controllers\ApiController@deleteStudent');
Route::get('students/search/{string}', 'App\Http\Controllers\ApiController@searchStudent');

// Salas 

Route::get('classrooms', 'App\Http\Controllers\ApiController@getAllClassrooms');
Route::get('classrooms/{id}', 'App\Http\Controllers\ApiController@getClassroom');
Route::post('classrooms', 'App\Http\Controllers\ApiController@createClassroom');
Route::put('classrooms/{id}', 'App\Http\Controllers\ApiController@updateClassroom');
Route::delete('classrooms/{id}','App\Http\Controllers\ApiController@deleteClassroom');
Route::get('classrooms/search/{string}', 'App\Http\Controllers\ApiController@searchClassroom');


// Professores

Route::get('teachers', 'App\Http\Controllers\ApiController@getAllTeachers');
Route::get('teachers/{id}', 'App\Http\Controllers\ApiController@getTeacher');
Route::post('teachers', 'App\Http\Controllers\ApiController@createTeacher');
Route::put('teachers/{id}', 'App\Http\Controllers\ApiController@updateTeacher');
Route::delete('teachers/{id}','App\Http\Controllers\ApiController@deleteTeacher');
Route::get('teachers/search/{string}', 'App\Http\Controllers\ApiController@searchTeacher');

// Livros

Route::get('books', 'App\Http\Controllers\ApiController@getAllBooks');
Route::get('books/{id}', 'App\Http\Controllers\ApiController@getBook');
Route::post('books', 'App\Http\Controllers\ApiController@createBook');
Route::put('books/{id}', 'App\Http\Controllers\ApiController@updateBook');
Route::delete('books/{id}','App\Http\Controllers\ApiController@deleteBook');
Route::get('books/search/{string}', 'App\Http\Controllers\ApiController@searchBook');


