pragma solidity ^0.4.25;



contract Owner {
    address public manager;

    event managerChanged(address indexed _from, address indexed _to);

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, 'This function can only be called by the manager of this lottery');
        _;
    }

    function changeManager(address _newManager) onlyManager public {
        manager = _newManager;
        emit managerChanged(msg.sender, _newManager);
    }
}


contract Lottery is Owner {
    // Contract Stae Variables
    address[] public players;
    
    event winnerPicked(address indexed _lotteryWinner);
    event playerAdded(address indexed _player);
    
    
    function random() private view returns (uint) {
        uint rand = uint(keccak256 (abi.encodePacked(block.difficulty, now, players)));
        return rand % players.length;
    }
    
    function getPlayers() view public returns(address[]) {
        return players;
    }
    
    function enterLottery() public payable {
        require(msg.value > .01 ether, 'You can only enter the lottery with value greater than .01');
        require(msg.sender != manager);
        players.push(msg.sender);
        emit playerAdded(msg.sender);
    }
    
    function pickAWinner() public onlyManager {
        uint luccyPickNo = random();
        address luckyPick = players[luccyPickNo];
        luckyPick.transfer(address(this).balance);
        
        emit winnerPicked(players[luccyPickNo]);
        players = new address[](0);
        
    }
}