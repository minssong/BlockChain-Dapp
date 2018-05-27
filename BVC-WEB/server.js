
// 필요한 npm 설치
var Web3 = require('web3');
var express = require('express');

// web3와 express 변수를 선언합니다.
var app = express();
var web3 = new Web3();

// web3의 위치를 지정하는 함수입니다. web3의 위치는 http://yangarch.iptime.org:8545에 있습니다.
web3.setProvider(new web3.providers.HttpProvider('http://yangarch.iptime.org:8545'));

// sol파일의 컨트랙트 주소입니다.
var contractAddress = '0xa038677892f437beb685a78e57a7495e9276774f';
// sol파일의 abi 값입니다.
var interface = [{"constant":false,"inputs":[{"name":"_placeID","type":"uint256"}],"name":"getCandidate","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getAllPlace","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voterList","outputs":[{"name":"phone","type":"uint256"},{"name":"votedPlace","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_phone","type":"uint256"},{"name":"_votedPlace","type":"uint256"}],"name":"checkVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_votedPlace","type":"uint256"},{"name":"_candidateID","type":"uint256"},{"name":"_phone","type":"uint256"}],"name":"vote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPollingPlace","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setPollingPlace","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"placeID","type":"uint256"},{"name":"voteCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_placeID","type":"uint256"}],"name":"voteEnd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"placeList","outputs":[{"name":"voting","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_placeID","type":"uint256"}],"name":"setCandidate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_placeID","type":"uint256"}],"name":"voteStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"v","type":"uint256"}],"name":"uintToString","outputs":[{"name":"str","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_candidateID","type":"uint256"}],"name":"counting","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
// 컨트랙트를 연결합니다.
var contract = web3.eth.contract(interface);
var BVC = contract.at(contractAddress);
// eth를 지불할 eth지갑을 선택합니다.
web3.eth.defaultAccount = web3.eth.accounts[0];
// ------------------------- 기본세팅 변경될 사항은 web3주소와 컨트랙트 주소, abi만 가변성이 있습니다. -----------------------------------

// 투표장을 생성합니다.
app.get('/setPollingPlace', function (req, res) {  
  setPollingPlace(function(jsonData){
    res.json(jsonData);
  });
});

// 후보자를 등록합니다.
app.get('/setCandidate', function (req, res) {  
  
});

// 등록된 투표장을 볼 수 있습니다.
app.get('/setAllplace', function (req, res) {  
  
});

// 투표권을 행사합니다.
app.get('/setVote', function (req, res) {  
  
});

// 투표했는지 여부를 확인합니다.
app.get('/getCheckVoted', function (req, res) {  
  
});

// 투표를 시작합니다. (정해진 기간동안 투표권을 행사할 수 있습니다.)
app.get('/setVoteStart', function (req, res) {  
  
});

// 투표를 종료합니다. (투표권을 더 이상 행사할 수 없습니다.)
app.get('/setVoteEnd', function (req, res) {  
  
});

// 개표합니다.
app.get('/getCounting', function (req, res) {  
  
});


// ------------------------- 메소드입니다 -----------------------------

var jsonString = {
  		"code"     : "",
        "message"  : "",
    	"data"     : ""
}

// 1. 투표장을 생성하는 메소드입니다.
function setPollingPlace(json){
  BVC.setPollingPlace.sendTransaction(function(err, res){
    if(!err) {
      
      BVC.getPollingPlace.call(function(err, res){
      	// 방금 생성한 투표장의 번호를 반환합니다.
        if(!err) {
        	var placeid = { "placeid" : res };
			jsonString["code"] = 200;
			jsonString["message"] = "success";
			jsonString["data"] = placeid;

			json(jsonString);
          
        } else {
			jsonString["code"] = 400;
			jsonString["message"] = err;
			json(jsonString);
        }
      })

    } else {
      jsonString["code"] = 400;
      jsonString["message"] = err;
      json(jsonString);
    }
  })
}

// 2. 후보자 등록하는 메소드입니다.
function setCandidate(placeid, json) {
	// getCandidate로 등록한 후보자 ID 반환
}

// 3. 등록된 투표장 보는 메소드입니다.
function getAllplace() {
	var placeid = 1;
	// set에서 get으로 
	BVC.setAllCandidate.sendTransaction(placeid, function(err, res){
		if(!err) {

		} else {
			console.log(err);
		}
	});
	
}

// 4. 등록된 후보자보기
function getAllCandidate(placeid, json){

}

// 5. 투표하는 메소드입니다.
function setVote(placeid, candidateid, phone) {

}

// 6. 개표합니다.
function getCounting(candidateid) {

}

// 7. 투표를 했는지 확인하는 메소드입니다.
function getCheckVoted(phone, placeid) {

}

// 8. 투표를 시작합니다.
function setVoteStart(placeid) {

}

// 9. 투표를 종료합니다.
function setVoteEnd(placeid) {

}




app.listen(4210, function () {
  console.log('eth server start: 4210');
});

