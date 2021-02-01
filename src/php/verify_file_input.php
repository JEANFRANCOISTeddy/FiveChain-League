<?php
    session_start();

    $name = $_POST['name'];
    $price = $_POST['price'];

    $fileName = $_FILES['imgUrl']['name'];
    $fileTmpName = $_FILES['imgUrl']['tmp_name'];
    $fileType = $_FILES['imgUrl']['type'];
    $fileSize = $_FILES['imgUrl']['size'];
    $fileError = $_FILES['imgUrl']['error'];

    $fileExtension = explode('.', $fileName);
    $fileActualExtension = strtolower(end($fileExtension));

    $allowed = array('jpg', 'jpeg', 'png');
    if (in_array($fileActualExtension, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 3000000) {
                $fileNameNew = date('Y-m-d-H-i-s');
                $fileDestination = '..\img\cards\\' . $fileNameNew . '.' . $fileActualExtension;
                move_uploaded_file($fileTmpName, $fileDestination);
            }
        }
    }

    $file = array( 'path_file' => $fileDestination );
    echo json_encode($file);


    $_SESSION['cards_number'] = $_SESSION['cards_number'] + 1;

    $_SESSION['card'][$_SESSION['cards_number']] = array();
    $_SESSION['card'][$_SESSION['cards_number']]['path'] = $fileDestination;
    $_SESSION['card'][$_SESSION['cards_number']]['price'] = $price;
    $_SESSION['card'][$_SESSION['cards_number']]['name'] = $name;
    $_SESSION['card'][$_SESSION['cards_number']]['id'] = $_SESSION['cards_number'] - 1;

?>
