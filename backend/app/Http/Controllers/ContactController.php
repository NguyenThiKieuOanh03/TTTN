<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{

    public function index($status, $page = 1)
    {
        $contacts = Contact::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'phone', 'status', 'email', 'title')
            ->get();
        $total = Contact::count();
        $result = [
            'status' => true,
            'contacts' => $contacts,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:10',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $contact = new Contact();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->reply_id = $request->reply_id;
        $contact->created_at = date('Y-m-d H:i:s');
        $contact->created_by = 1;
        $contact->status =1;
        if($contact->save())
        {
            // Gửi email thông báo
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'title' => $request->title,
                'content' => $request->content,
            ];

            Mail::send('contact', $data, function ($message) use ($data) {
                $message->from($data['email'], $data['name']);
                $message->to('organicfruitables@gmail.com', 'Organic Fruitable')
                        ->subject($data['title']);
            });

            $result =[
                'status' => true,
                'contact' => $contact,
                'message' => 'Thêm dữ liệu và gửi email thành công',    
            ];
            return response ()->json($result, 200);
        }

        $result =[
            'status' => false,
            'contact' => null,
            'message' => 'Không thể thêm dữ liệu',    
        ];
        return response ()->json($result, 200);
    }

    public function show($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'contact' => $contact,
            'message' => 'Tải dữ liệu thành công',

        ];
        return response()->json($result, 200);

    }
    function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        $contact->name = $request->name; //reactjs
        $contact->user_id = $request->user_id; //form
        $contact->email = $request->email; //form
        $contact->phone = $request->phone; //form
        $contact->title = $request->title; //form
        $contact->content = $request->content; //form
        $contact->replay_id = $request->replay_id; //form
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //tam
        $contact->status = $request->status; //reactjs
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        //
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Không thể cập nhật dữ liệu',
        ];
        return response()->json($result, 200);
    }
    public function status($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //tam
        $contact->status = ($contact->status == 1) ? 2 : 1; //reactjs
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Tải dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Không thể cập nhật dữ liệu',

        ];
        return response()->json($result, 200);

    }


    public function destroy($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }
        if ($contact->delete()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Không thể xóa dữ liệu',
        ];
        return response()->json($result, 200);
    }

    //Thùng rác
    public function trash($status, $page = 1)
    {
        $contacts = Contact::where('status', '==', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'phone', 'status', 'email','title')
            ->get();
        $total = Contact::count();
        $result = [
            'status' => true,
            'contacts' => $contacts,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    //Xóa vào thùng rác
    public function delete($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //tam
        $contact->status = 0; //reactjs
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Xóa dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }
    //Khôi phục dữ liệu
    public function restore($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Không tìm thấy dữ liệu ',

            ];
            return response()->json($result, 404);
        }
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //tam
        $contact->status = 1; //
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Khôi phục dữ liệu thành công',

            ];
            return response()->json($result, 200);
        }
    }

    function reply (Request $request, $id)
    {
        {
            $contact = Contact::find($id);
            if (!$contact) {
                return response()->json(['error' => 'Email không tồn tại'], 404);
            }
    
            Mail::send([], [], function ($message) use ($request, $contact) {
                $message->to($contact->email, $contact->name)
                    ->subject($request->title)
                    ->text($request->replyContent);
            });
    
            // Cập nhật trạng thái đã trả lời cho liên hệ
            $contact->reply_id = true;
            $contact->save();
    
            return response()->json(['message' => 'Email trả lời đã được gửi'], 200);
        }

    }


}
