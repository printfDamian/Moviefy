<?php 

    // to add just adds the user_id and movie_id to the favorite table 
    if(isset($_SESSION['user_id'])){
        $client_id = $_SESSION['user_id'];
    }
    
?>