<!Doctype html>
<div>
<?php 
    session_start();
    echo var_dump($_SESSION);
?>
</div>
<html>
    <head>
        <meta charset="utf-8">
        <title>FiveChain League</title>
        <link rel="icon" type="image/png" href="/fivechain-league/src/img/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <link rel="stylesheet" href="/fivechain-league/src/css/font-awesome.min.css">
        <link rel="stylesheet" href="/fivechain-league/src/css/all.min.css">
        <link rel="stylesheet" href="/fivechain-league/src/css/style.css">
        <script src="/fivechain-league/node_modules/web3/dist/web3.min.js"></script>
    </head>

    <body>
        <header>
            <div class="header_menu">
                <div class="hm_card hm_box">
                    <a href="cards.html"><i class="fas fa-shopping-cart fa-2x fa_icon"></i>
                    <h5 class="fa_text pt-1 text_font">CARDS</h5></a>
                </div>
                <div class="hm_bet hm_box">
                    <a href="bet.html"><i class="far fa-futbol fa-2x fa_icon"></i>
                    <h5 class="fa_text pt-1 text_font">BET</h5></a>
                </div>
                <div class="hm_exchange hm_box">
                    <a href="exchange.html"><i class="fas fa-exchange-alt fa-2x fa_icon"></i>
                    <h5 class="fa_text pt-1 text_font">EXCHANGE</h5></a>
                </div>
            </div>
            <div class="header_logo">
                <img class="hl_logo" src="/fivechain-league/src/img/logo.png">
            </div>
            <div class="header_account">
                <h5 class="text_font">YOUR ACCOUNT ADDRESS : 
                    <span class="account_address text_font"></span>
                </h5>
            </div>
        </header>

        <main class="container">

            <div class="card text-center mb-3">  
                <div class="card text-center">
                    <div class="card-header"><h4><b>All football players cards</b></h4></div>
                        <div class="card-body all_players">
                            <?php if(!empty($_SESSION['card']) && isset($_SESSION['card'])) { ?>
                                <?php foreach( $_SESSION['card'] as $card ){ ?>
                                    <img id="" class="player_card" onclick="cardId(<?= $card['id'] ?>)" src=<?= $card['path'] ?> width="150px" data-name="<?= $card['name'] ?>" data-price="<?= $card['price'] ?>" data-id="<?= $card['id'] ?>">
                                <?php } ?>
                            <?php } ?>
                        </div>
                    <div class="card-footer text-muted">
                        <div>

                            <div class="input-group mb-3">
                                <input type="number" name="price" id="price_card" placeholder="0" class="form-control" value="" readonly>
                            </div>

                            <button id="buy_card" type="button" class="btn btn-success">Buy</button>
                            <button type="button" class="btn btn-primary">Sell</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-5">
                    <div class="card text-center mb-3">
                        <div class="card-header"><h4><b>Create your own player</b></h4></div>
                        <div class="card-body">
                            <img id="imgPreview" src="" alt="" width="200px">
                        </div>
                        <div class="card-footer text-muted">
                            <form id="form_create_player" method="POST">
                                    <div class="input-group mb-3">
                                        <label for="" class="input-group-text">Name : </label>
                                        <input type="text" name="name" id="name" placeholder="Mbappe" class="form-control" >
                                    </div>
                                    <div class="input-group mb-3">
                                        <label for="" class="input-group-text">Price : </label>
                                        <input type="number" name="price" id="price" placeholder="0" class="form-control" >
                                    </div>
                                    <div class="input-group mb-3">
                                        <label for="" class="input-group-text">Image : </label>
                                        <input type="file" name="imgUrl" id="imgUrl" class="form-control" >
                                    </div>
                                <div>
                                    <button id="create_button" type="button" class="btn btn-primary">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-xl-7">
                    <div class="card text-center">
                        <div class="card-header"><h4><b>Your football players cards</b></h4></div>
                        <div class="card-body my_cards">
                            <?php if(!empty($_SESSION['my_card']) && isset($_SESSION['my_card'])) { ?>
                                <?php foreach( $_SESSION['my_card'] as $my_card ){ ?>
                                    <img id="" class="player_card" onclick="cardId(<?= $my_card['id'] ?>)" src=<?= $my_card['path'] ?> width="150px" data-name="<?= $my_card['name'] ?>" data-price="<?= $my_card['price'] ?>" data-id="<?= $my_card['id'] ?>">
                                <?php } ?>
                            <?php } ?>
                        </div>
                        <div class="card-footer text-muted"></div>
                    </div>
                </div>

            </div>
            
            <div id="file_path" style="display: none;"></div>
        </main>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="/fivechain-league/src/js/script.js"></script>
    </body>
</html>