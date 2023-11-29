<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Right Shows</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <!-- Updated toastr script and stylesheet links -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .jumbotron {
            background-color: #007bff;
            background-image: url("img/movies_and_shows.png");
            background-repeat: no-repeat;
            background-size: cover;
            color: #ffffff;
            padding: 2rem;
            margin-bottom: 0;
        }
    </style>
</head>
<body>

    <div class="jumbotron text-center">
        <h1 class="display-4">Right Shows</h1>
        <p class="lead">Discover the top-rated, popular, and recent movies and shows.</p>
        <p>
            <button class="btn btn-outline-light btn-lg login-button" data-toggle="modal" data-target="#loginModal">Login</button>
            <button class="btn btn-outline-light btn-lg register-button" data-toggle="modal" data-target="#registerModal">Register</button>
        </p>
    </div>

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-4">
                <h2>Top Rated</h2>
                <p>Explore the highest-rated movies and shows.</p>
            </div>
            <div class="col-md-4">
                <h2>Popular</h2>
                <p>Check out what's trending and loved by the community.</p>
            </div>
            <div class="col-md-4">
                <h2>Recent</h2>
                <p>Stay up-to-date with the latest releases in the world of entertainment.</p>
            </div>
        </div>
    </div>
    <!-- Login Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Login Form -->
                <form id="loginForm" method="POST" action="PHP/loginUser.php">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" class="form-control" id="loginEmail" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" class="form-control" name="password" id="loginPassword" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Display toastr notification for login failure -->
<?php
if (isset($_SESSION['login_failed']) && $_SESSION['login_failed']) { ?>
    <script>
        $(function () {
            toastr.error("Login failed. Please check your email and password.");
        });
    </script>
<?php
    unset($_SESSION['login_failed']);
}
?>

    <!-- Register Modal -->
<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="registerModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Register Form -->
                <form id="registerForm" method="POST" action="PHP/insertUser.php">
                    <div class="form-group">
                        <label for="registerUsername">Username</label>
                        <input type="text" name="name" class="form-control" id="registerUsername" placeholder="Enter your username" required>
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email</label>
                        <input type="email" name="email" class="form-control" id="registerEmail" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <input type="password" name="password" class="form-control" id="registerPassword" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>

                    <?php
                    if (isset($_SESSION["email_registered"])) { ?>
                        <!-- Use toastr to display a warning message -->
                        <script>
                            $(function () {
                                toastr.warning("Your email is already registered you should  login");
                            });
                        </script>
                        <?php
                        unset($_SESSION["email_registered"]);
                    }
                    ?>
                </form>
            </div>
        </div>
    </div>
</div>
    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <!-- toastr script -->
</body>
</html>
