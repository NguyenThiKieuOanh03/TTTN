<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where([['status', '!=', 0], ['roles', '=', '1']])->orderBy('created_at', 'DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'users' => $users],
            200
        );
    }
    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name; //form
        $user->username = $request->username; //form
        $user->password = $request->password; //form
        $user->gender = $request->gender; //form
        $user->email = $request->email; //form
        $user->address = $request->address; //form

        $user->phone = $request->phone; //form
        $user->roles = $request->roles; //form
        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1;
        $user->status = $request->status; //form
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'user' => $user,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }

    public function status($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //tam
        $user->status = ($user->status == 1) ? 2 : 1; //reactjs
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $user->name = $request->name; //form
        $user->username = $request->username; //form
        $user->password = $request->password; //form
        $user->gender = $request->gender; //form
        $user->email = $request->email; //form
        $user->phone = $request->phone; //form
        $user->address = $request->address; //form

        $user->roles = $request->roles; //form
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //tam
        $user->status = $request->status; //reactjs
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($user->delete()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $users = User::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'phone', 'status', 'email')
            ->get();
        $total = User::count();
        $result = [
            'status' => true,
            'users' => $users,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //tam
        $user->status = 0; //reactjs
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //tam
        $user->status = 1; //
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    
}
