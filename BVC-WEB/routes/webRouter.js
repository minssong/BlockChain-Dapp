// 웹과 연동하는 라우터입니다.
var ejs = require('ejs')
var fs = require('fs');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

var path = process.cwd();
var blockFunc = require( path + '/model/blockFunc' );
var dbFunc = require( path + '/model/dbFunc' );

// 1-1. 선거장 생성 page open
router.get('/setPollingPlace', function(req, res){
    res.sendFile( path + '/public/setPollingPlace.html');
});

// 1-2. 선거장 생성하는 메소드
router.post('/setPollingPlace', function(req, res){
    var info = [req.body.user_name,
                req.body.start_regist_period,
                req.body.end_regist_period,
                req.body.votedate,
                req.body.place_contents,
                req.body.start_vote_time,
                req.body.end_vote_time];

    blockFunc.setPollingPlace(function(err, placeid, isStarted){
        if (!err) {
            if (placeid != null){
                dbFunc.insertPlaceInfo(placeid, isStarted, info, function(result){
                    res.redirect('/web/getAllplace');
                });
            } else {
                res.send('block Chain err!')
            }
        } else {
            res.send('setPollingPlace... err!!!');
            console.log(err);
        }
    });
});

// 2-1. 모든 선거리스트를 전송합니다.
router.get('/getAllplace', function(req, res){
    fs.readFile( path + '/public/getAllplace.html', 'utf8', function(err, data){
        if(!err){
            dbFunc.searchPlaceInfo(function(err, result){
                if(!err) {
                    res.send(ejs.render(data, {placeInfoList : result}));
                } else {
                    res.send("데이터를 불러올 수 없습니다. 잠시 후 다시 접속해주세요.")
                }
            })
        } else {
            res.send("투표 시작 페이지를 불러올 수 없습니다. 잠시 후 다시 접속해주세요.");
        }
    })
});

// 2-2. 투표를 시작합니다. (정해진 기간동안 투표권을 행사할 수 있습니다.)
router.get('/setVoteStart/:placeid', function (req, res) {
    var placeid = req.params.placeid;

    blockFunc.setVoteStart(placeid, function(err, result) {
        if (!err) {
            dbFunc.updateIsStarted(placeid, true, function(_err, _res) {
                if (!_err) {
                    res.redirect('/web/getAllplace');
                    //res.send('<h1>투표장 번호 : ' + placeid + ' 가 시작되었습니다.....end</h1>')
                } else {
                    result('<h1>투표를 시작하지 못했습니다.....db err</h1>');
                }
            })
        } else {
            result('<h1>투표를 시작하지 못했습니다.....err</h1>');
        }
    });
});

// 2-3. 투표를 종료합니다. (투표권을 더 이상 행사할 수 없습니다.)
router.get('/setVoteEnd/:placeid', function (req, res) {
    var placeid = req.params.placeid;

    blockFunc.setVoteEnd(placeid, function(err, result) {
        if (!err) {
            dbFunc.updateIsStarted(placeid, 3, function(_err, _res) {
                if (!_err) {
                    res.redirect('/web/getAllplace');
                    //res.send('<h1>투표장 번호 : ' + placeid + ' 가 종료되었습니다.....end</h1>')
                } else {
                    result('<h1>투표를 종료하지 못했습니다.....db err</h1>');
                }
            })
        } else {
            result('<h1>투표를 종료하지 못했습니다.....err</h1>');
        }
    });
});

// 3-1. 입력한 투표장의 모든 후보자를 볼 수 있습니다.
router.get('/getAllCandidate/:placeid', function (req, res){
    var placeid = req.params.placeid;

    fs.readFile( path + '/public/getAllCandidate.html', 'utf8', function(err, data) {
        console.log('모든 후보자 : '+placeid)
    });
});

// 3-2. 입력한 투표장의 등록된 후보자를 볼 수 있습니다.
router.get('/getBookedCandidate/:placeid', function (req, res){
    var placeid = req.params.placeid;

    fs.readFile( path + '/public/getBookedCandidate.html', 'utf8', function(err, data) {
        console.log('등록된 후보자 : '+placeid)
    });
});

//// 아직


// 3-3. 후보자를 등록합니다. 웹페이지
router.get('/setCandidate', function (req, res) {
    blockFunc.setCandidate(1, function(json){
        console.log(json)
    })
});

// 6. 개표합니다. - 웹페이지 형태와 json 형태가 필요합니다.
router.get('/getCounting', function(req, res){
    fs.readFile( path + '/public/getCounting.html', 'utf8', function(err, data){
        if(!err){
            dbFunc.searchPlaceInfo(function(err, result){
                if(!err) {
                    res.send(ejs.render(data, {placeInfoList : result}));
                } else {
                    res.send("데이터를 불러올 수 없습니다. 잠시 후 다시 접속해주세요.")
                }
            })
        } else {
            res.send("투표 시작 페이지를 불러올 수 없습니다. 잠시 후 다시 접속해주세요.");
        }
    })
});


module.exports = router;