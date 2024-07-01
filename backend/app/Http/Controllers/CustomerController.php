<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function index()
    {
        $customers = Customer::where([['status', '!=', 0], ['roles', '=', '2']])->orderBy('created_at', 'DESC')->get();
        return response()->json(
            ['success' => true, 'message' => 'Tải dữ liệu thành công', 'customers' => $customers],
            200
        );
    }
    public function store(Request $request)
    {
        $customer = new Customer();
        $customer->name = $request->name; //form
        $customer->username = $request->username; //form
        $customer->password = $request->password; //form
        $customer->gender = $request->gender; //form
        $customer->email = $request->email; //form
        $customer->address = $request->address; //form

        $customer->phone = $request->phone; //form
        $customer->roles = $request->roles; //form
        $customer->created_at = date('Y-m-d H:i:s');
        $customer->created_by = 1;
        $customer->status = $request->status; //form
        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Thêm dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Không thể thêm dữ liệu',
        ];
        return response()->json($result, 200);

    }

    public function status($id)
    {
        $customer = Customer::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //tam
        $customer->status = ($customer->status == 1) ? 2 : 1; //reactjs
        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }



    public function show($id)
    {
        $customer = Customer::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }
    function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $customer->name = $request->name; //form
        $customer->username = $request->username; //form
        $customer->password = $request->password; //form
        $customer->gender = $request->gender; //form
        $customer->email = $request->email; //form
        $customer->address = $request->address; //form

        $customer->phone = $request->phone; //form
        $customer->roles = $request->roles; //form
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //tam
        $customer->status = $request->status; //reactjs
        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($customer->delete()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'customer' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $customers = Customer::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'phone', 'status','email')
            ->get();
        $total = Customer::count();
        $result = [
            'status' => true,
            'customers' => $customers,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $customer = Customer::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //tam
        $customer->status = 0; //reactjs
        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $customer = Customer::find($id);
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = 1; //tam
        $customer->status = 1; //
        if ($customer->save()) {
            $result = [
                'status' => true,
                'customer' => $customer,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

}
