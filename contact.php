<?php

header('Content-Type: application/json; charset=UTF-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request.'
    ]);
    exit;
}

// Get the exact field names from your HTML form
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$matter = trim($_POST['matter'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate required fields
if (
    $name === '' ||
    $email === '' ||
    $phone === '' ||
    $matter === '' ||
    $message === ''
) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields.'
    ]);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {

    // =========================
    // Gmail SMTP
    // =========================

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'jassociate98@gmail.com';

    // PUT YOUR GMAIL APP PASSWORD HERE
    $mail->Password = 'bwff bmmm tbzt nlpg';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;


    // =========================
    // Sender & Receiver
    // =========================

    $mail->setFrom(
        'jassociate98@gmail.com',
        'J.S. Associates Website'
    );

    $mail->addAddress(
        'jassociate98@gmail.com'
    );

    // Visitor's email
    $mail->addReplyTo(
        $email,
        $name
    );


    // =========================
    // Email content
    // =========================

    $mail->isHTML(true);

    $mail->Subject = 'New Website Inquiry - ' . $matter;

    $mail->Body = '
        <h2>New Website Inquiry</h2>

        <p>
            <strong>Name:</strong>
            ' . htmlspecialchars($name) . '
        </p>

        <p>
            <strong>Email:</strong>
            ' . htmlspecialchars($email) . '
        </p>

        <p>
            <strong>Phone:</strong>
            ' . htmlspecialchars($phone) . '
        </p>

        <p>
            <strong>Practice Area:</strong>
            ' . htmlspecialchars($matter) . '
        </p>

        <p>
            <strong>Description:</strong>
        </p>

        <p>
            ' . nl2br(htmlspecialchars($message)) . '
        </p>
    ';

    $mail->AltBody =
        "New Website Inquiry\n\n" .
        "Name: $name\n" .
        "Email: $email\n" .
        "Phone: $phone\n" .
        "Practice Area: $matter\n\n" .
        "Description:\n$message";


    // Send
    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => 'Your inquiry has been sent successfully.'
    ]);

} catch (Exception $e) {

    echo json_encode([
        'success' => false,
        'message' => 'Email could not be sent. Please check your SMTP configuration.'
    ]);
}