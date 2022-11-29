<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\Book;
use App\Models\Classroom;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    public function searchStudent($name){
      return Student::where("name","like","%".$name."%")->get();
    }

    public function getAllStudents() {
        //$students = Student::get()->toJson(JSON_PRETTY_PRINT);
        //return response($students, 200);
        $data = Student::paginate(10);    
        return response($data, 200);
      }

    public function createStudent(Request $request) {
        $student = new Student;
        $student->name = $request->name;
        $student->course = $request->course;
        $student->save();
    
        return response()->json([
            "message" => "Estudante Criado"
        ], 201);
      }

    public function getStudent($id) {
        if (Student::where('id', $id)->exists()) {
            $student = Student::where('id', $id)->get();
            return response($student, 200);
          } else {
            return response()->json([
              "message" => "Estudante não encontrado."
            ], 404);
          }
    }

    public function updateStudent(Request $request, $id) {
        if (Student::where('id', $id)->exists()) {
            $student = Student::find($id);
            $student->name = is_null($request->name) ? $student->name : $request->name;
            $student->course = is_null($request->course) ? $student->course : $request->course;
            $student->save();
    
            return response()->json([
                "message" => "Estudante alterado com sucesso."
            ], 200);
            } else {
            return response()->json([
                "message" => "Estudante não encontrado."
            ], 404);
            
        }
    }

    public function deleteStudent ($id) {
        if(Student::where('id', $id)->exists()) {
            $student = Student::find($id);
            $student->delete();
    
            return response()->json([
              "message" => "Estudante deletado."
            ], 202);
          } else {
            return response()->json([
              "message" => "Estudante não encontrado."
            ], 404);
          }
    }

    public function searchBook($name){
      return Book::where("name","like","%".$name."%")->get();
    }

    public function getAllBooks() {
        //$Books = Book::get()->toJson(JSON_PRETTY_PRINT);
        //return response($Books, 200);
        $data = Book::paginate(10);    
        return response($data, 200);
      }
    
    public function createBook(Request $request) {
        $Book = new Book;
        $Book->name = $request->name;
        $Book->materia = $request->materia;
        $Book->save();
    
        return response()->json([
            "message" => "Livro Criado"
        ], 201);
      }
    
    public function getBook($id) {
        if (Book::where('id', $id)->exists()) {
            $Book = Book::where('id', $id)->get();
            return response($Book, 200);
          } else {
            return response()->json([
              "message" => "Livro não encontrado."
            ], 404);
          }
    }
    
    public function updateBook(Request $request, $id) {
        if (Book::where('id', $id)->exists()) {
            $Book = Book::find($id);
            $Book->name = is_null($request->name) ? $Book->name : $request->name;
            $Book->materia = is_null($request->materia) ? $Book->materia : $request->materia;
            $Book->save();
    
            return response()->json([
                "message" => "Livro alterado com sucesso."
            ], 200);
            } else {
            return response()->json([
                "message" => "Livro não encontrado."
            ], 404);
    
        }
    }
    
    public function deleteBook ($id) {
        if(Book::where('id', $id)->exists()) {
            $Book = Book::find($id);
            $Book->delete();
    
            return response()->json([
              "message" => "Livro deletado."
            ], 202);
          } else {
            return response()->json([
              "message" => "Livro não encontrado."
            ], 404);
          }
    }

    public function searchTeacher($name){
      return Teacher::where("name","like","%".$name."%")->get();
    }
    
    public function getAllTeachers() {
       // $Teachers = Teacher::get()->toJson(JSON_PRETTY_PRINT);
       // return response($Teachers, 200);
       $data = Teacher::paginate(10);    
       return response($data, 200);
      }
    
    public function createTeacher(Request $request) {
        $Teacher = new Teacher;
        $Teacher->name = $request->name;
        $Teacher->materia = $request->materia;
        $Teacher->save();
    
        return response()->json([
            "message" => "Professor Criado"
        ], 201);
      }
    
    public function getTeacher($id) {
        if (Teacher::where('id', $id)->exists()) {
            $Teacher = Teacher::where('id', $id)->get();
            return response($Teacher, 200);
          } else {
            return response()->json([
              "message" => "Professor não encontrado."
            ], 404);
          }
    }
    
    public function updateTeacher(Request $request, $id) {
        if (Teacher::where('id', $id)->exists()) {
            $Teacher = Teacher::find($id);
            $Teacher->name = is_null($request->name) ? $Teacher->name : $request->name;
            $Teacher->materia = is_null($request->materia) ? $Teacher->materia : $request->materia;
            $Teacher->save();
    
            return response()->json([
                "message" => "Professor alterado com sucesso."
            ], 200);
            } else {
            return response()->json([
                "message" => "Professor não encontrado."
            ], 404);
    
        }
    }
    
    public function deleteTeacher ($id) {
        if(Teacher::where('id', $id)->exists()) {
            $Teacher = Teacher::find($id);
            $Teacher->delete();
    
            return response()->json([
              "message" => "Professor deletado."
            ], 202);
          } else {
            return response()->json([
              "message" => "Professor não encontrado."
            ], 404);
          }
    }
    
    public function searchClassroom($name){
      return Classroom::where("name","like","%".$name."%")->get();
    }

    public function getAllClassrooms() {
        //$Classrooms = Classroom::get()->toJson(JSON_PRETTY_PRINT);
        //return response($Classrooms, 200);
        $data = Classroom::paginate(10);    
        return response($data, 200);
      }
    
    public function createClassroom(Request $request) {
        $Classroom = new Classroom;
        $Classroom->name = $request->name;
        $Classroom->number = $request->number;
        $Classroom->save();
    
        return response()->json([
            "message" => "Sala de Aula Criada"
        ], 201);
      }
    
    public function getClassroom($id) {
        if (Classroom::where('id', $id)->exists()) {
            $Classroom = Classroom::where('id', $id)->get();
            return response($Classroom, 200);
          } else {
            return response()->json([
              "message" => "Sala de Aula não encontrada."
            ], 404);
          }
    }
    
    public function updateClassroom(Request $request, $id) {
        if (Classroom::where('id', $id)->exists()) {
            $Classroom = Classroom::find($id);
            $Classroom->name = is_null($request->name) ? $Classroom->name : $request->name;
            $Classroom->number = is_null($request->number) ? $Classroom->number : $request->number;
            $Classroom->save();
    
            return response()->json([
                "message" => "Sala de Aula alterada com sucesso."
            ], 200);
            } else {
            return response()->json([
                "message" => "Sala de Aula não encontrada."
            ], 404);
    
        }
    }
    
    public function deleteClassroom ($id) {
        if(Classroom::where('id', $id)->exists()) {
            $Classroom = Classroom::find($id);
            $Classroom->delete();
    
            return response()->json([
              "message" => "Sala de Aula deletada."
            ], 202);
          } else {
            return response()->json([
              "message" => "Sala de Aula não encontrada."
            ], 404);
          }
    }
}