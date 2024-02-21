<?php
if(isset($_POST['mail'])){
    $name = $_POST['name'];
    $name = filter_var($name,FILTER_SANITIZE_STRING);
    
    $email = $_POST['email'];
    $email = filter_var($email,FILTER_SANITIZE_EMAIL);
    
    $phone = $_POST['phone'];
    $phone = filter_var($phone,FILTER_SANITIZE_STRING);
    
    $service = $_POST['service'];
    $service = filter_var($service,FILTER_SANITIZE_STRING);
    
    $projectDetails = $_POST['projectDetails'];
    $projectDetails = filter_var($projectDetails,FILTER_SANITIZE_STRING);
    
    $to = 'hiajayy@gmail.com';
    $headers = 'From: '. $name;
    $subject = 'Contact Form';
    $message = "Name: ".$name . "\r\n Email: " .$email. "\r\n Phone: ".$phone."\r\n Service: ".$service."\r\n Project Details: ".$projectDetails;
    if(mail($to,$subject,$message,$headers)){
        echo json_encode(['status' => 'success','message' => 'Message sent successfully.']);
    }
    else{
        echo json_encode(['status' => 'failed','message' => 'Message could not be sent.']);
    }
    
}
else{
    echo json_encode(['status' => 'unknown','message' => 'Something went wrong.']);
}