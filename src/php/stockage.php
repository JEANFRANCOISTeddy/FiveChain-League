<?php 
    session_start(); 

    $id = $_POST['id'];
    $new_id = $id + 1;

    if($_SESSION['card'][$new_id]['id'] == $id ){
        $_SESSION['my_cards_number'] = $_SESSION['my_cards_number'] + 1;

        $_SESSION['my_card'][$_SESSION['my_cards_number']] = array();
        $_SESSION['my_card'][$_SESSION['my_cards_number']]['path'] = $_SESSION['card'][$new_id]['path'];
        $_SESSION['my_card'][$_SESSION['my_cards_number']]['price'] = $_SESSION['card'][$new_id]['price'];
        $_SESSION['my_card'][$_SESSION['my_cards_number']]['name'] = $_SESSION['card'][$new_id]['name'];
        $_SESSION['my_card'][$_SESSION['my_cards_number']]['id'] = $_SESSION['card'][$new_id]['id'];
    }

    echo json_encode($_SESSION['my_card'][$_SESSION['my_cards_number']]);
?>