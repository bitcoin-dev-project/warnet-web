const fs = require('fs')

const data = {
      "header_infos": [
          {
              "id": 3,
              "prev_id": 2,
              "height": 104,
              "hash": "000001d781e5537377845e307675e2096be8004387cce7c1b93ee4f8e3529b8c",
              "version": 536870912,
              "prev_blockhash": "0000024d67060cd252cc0a9a3305e1b026b7cf005463bb712a824cf216e5ca23",
              "merkle_root": "0cbdabdf5cec48651996ba345680911ef0aaecc15782b002e42e3ef57ab40566",
              "time": 1728402124,
              "bits": 503543726,
              "nonce": 790529,
              "miner": ""
          },
          {
              "id": 4,
              "prev_id": 3,
              "height": 105,
              "hash": "000001367d0c5a6d1b85ebed86c02180b06df0bc0b221c71e2b6a468c1287131",
              "version": 536870912,
              "prev_blockhash": "000001d781e5537377845e307675e2096be8004387cce7c1b93ee4f8e3529b8c",
              "merkle_root": "a2b2454594baa6d0c8119329139e83a5d1e94c46b9b16ec11e2ff0ef63bbcff4",
              "time": 1728402724,
              "bits": 503543726,
              "nonce": 3197361,
              "miner": ""
          },
          {
              "id": 0,
              "prev_id": 18446744073709552000,
              "height": 0,
              "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
              "version": 1,
              "prev_blockhash": "0000000000000000000000000000000000000000000000000000000000000000",
              "merkle_root": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
              "time": 1598918400,
              "bits": 503543726,
              "nonce": 52613770,
              "miner": ""
          },
          {
              "id": 5,
              "prev_id": 4,
              "height": 106,
              "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
              "version": 536870912,
              "prev_blockhash": "000001367d0c5a6d1b85ebed86c02180b06df0bc0b221c71e2b6a468c1287131",
              "merkle_root": "026692355ecb6f37623376b5edadc3ed4df2046d85845ff4ce1303b54210c08d",
              "time": 1728403324,
              "bits": 503543726,
              "nonce": 3475258,
              "miner": ""
          },
          {
              "id": 1,
              "prev_id": 0,
              "height": 1,
              "hash": "00000039368dfdda1cbdbab4ddb6a74d649d099ed365519133a9fe66b3ec28ba",
              "version": 536870912,
              "prev_blockhash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
              "merkle_root": "d0b38f5c95160accf7b19dc2bc4998bad4fe783f2db5adeaf16b85cb57f15c16",
              "time": 1728340324,
              "bits": 503543726,
              "nonce": 5323373,
              "miner": ""
          },
          {
              "id": 2,
              "prev_id": 1,
              "height": 103,
              "hash": "0000024d67060cd252cc0a9a3305e1b026b7cf005463bb712a824cf216e5ca23",
              "version": 536870912,
              "prev_blockhash": "000001f87c58e83945529c44fe0ba3b21c0319e1e9471324d8f7680bcca5d27b",
              "merkle_root": "3ae081c1d2bed3abf58f6737a3d62dc21ebf4c69589d33963a00fa5b91790893",
              "time": 1728401524,
              "bits": 503543726,
              "nonce": 1521831,
              "miner": ""
          }
      ],
      "nodes": [
          {
              "id": 0,
              "name": "miner",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:27.0.0(miner)/",
              "reachable": true
          },
          {
              "id": 1,
              "name": "tank-0000-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(red)/",
              "reachable": true
          },
          {
              "id": 2,
              "name": "tank-0001-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(red)/",
              "reachable": true
          },
          {
              "id": 3,
              "name": "tank-0002-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(red)/",
              "reachable": true
          },
          {
              "id": 4,
              "name": "tank-0003-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(red)/",
              "reachable": true
          },
          {
              "id": 5,
              "name": "tank-0004-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(red)/",
              "reachable": false
          },
          {
              "id": 6,
              "name": "tank-0005-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(red)/",
              "reachable": true
          },
          {
              "id": 7,
              "name": "tank-0006-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(red)/",
              "reachable": true
          },
          {
              "id": 8,
              "name": "tank-0007-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(red)/",
              "reachable": true
          },
          {
              "id": 9,
              "name": "tank-0008-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(red)/",
              "reachable": true
          },
          {
              "id": 10,
              "name": "tank-0009-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(red)/",
              "reachable": true
          },
          {
              "id": 11,
              "name": "tank-0010-red",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(red)/",
              "reachable": true
          },
          {
              "id": 12,
              "name": "tank-0011-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(orange)/",
              "reachable": true
          },
          {
              "id": 13,
              "name": "tank-0012-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(orange)/",
              "reachable": true
          },
          {
              "id": 14,
              "name": "tank-0013-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(orange)/",
              "reachable": true
          },
          {
              "id": 15,
              "name": "tank-0014-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(orange)/",
              "reachable": true
          },
          {
              "id": 16,
              "name": "tank-0015-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(orange)/",
              "reachable": false
          },
          {
              "id": 17,
              "name": "tank-0016-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(orange)/",
              "reachable": true
          },
          {
              "id": 18,
              "name": "tank-0017-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(orange)/",
              "reachable": true
          },
          {
              "id": 19,
              "name": "tank-0018-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(orange)/",
              "reachable": true
          },
          {
              "id": 20,
              "name": "tank-0019-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(orange)/",
              "reachable": true
          },
          {
              "id": 21,
              "name": "tank-0020-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(orange)/",
              "reachable": true
          },
          {
              "id": 22,
              "name": "tank-0021-orange",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(orange)/",
              "reachable": true
          },
          {
              "id": 23,
              "name": "tank-0022-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(yellow)/",
              "reachable": true
          },
          {
              "id": 24,
              "name": "tank-0023-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(yellow)/",
              "reachable": true
          },
          {
              "id": 25,
              "name": "tank-0024-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(yellow)/",
              "reachable": true
          },
          {
              "id": 26,
              "name": "tank-0025-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(yellow)/",
              "reachable": true
          },
          {
              "id": 27,
              "name": "tank-0026-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(yellow)/",
              "reachable": false
          },
          {
              "id": 28,
              "name": "tank-0027-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(yellow)/",
              "reachable": true
          },
          {
              "id": 29,
              "name": "tank-0028-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(yellow)/",
              "reachable": true
          },
          {
              "id": 30,
              "name": "tank-0029-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(yellow)/",
              "reachable": true
          },
          {
              "id": 31,
              "name": "tank-0030-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(yellow)/",
              "reachable": true
          },
          {
              "id": 32,
              "name": "tank-0031-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(yellow)/",
              "reachable": true
          },
          {
              "id": 33,
              "name": "tank-0032-yellow",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(yellow)/",
              "reachable": true
          },
          {
              "id": 34,
              "name": "tank-0033-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(green)/",
              "reachable": true
          },
          {
              "id": 35,
              "name": "tank-0034-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(green)/",
              "reachable": true
          },
          {
              "id": 36,
              "name": "tank-0035-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(green)/",
              "reachable": true
          },
          {
              "id": 37,
              "name": "tank-0036-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(green)/",
              "reachable": true
          },
          {
              "id": 38,
              "name": "tank-0037-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(green)/",
              "reachable": false
          },
          {
              "id": 39,
              "name": "tank-0038-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(green)/",
              "reachable": true
          },
          {
              "id": 40,
              "name": "tank-0039-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(green)/",
              "reachable": true
          },
          {
              "id": 41,
              "name": "tank-0040-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(green)/",
              "reachable": true
          },
          {
              "id": 42,
              "name": "tank-0041-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(green)/",
              "reachable": true
          },
          {
              "id": 43,
              "name": "tank-0042-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(green)/",
              "reachable": true
          },
          {
              "id": 44,
              "name": "tank-0043-green",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(green)/",
              "reachable": true
          },
          {
              "id": 45,
              "name": "tank-0044-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(blue)/",
              "reachable": true
          },
          {
              "id": 46,
              "name": "tank-0045-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(blue)/",
              "reachable": true
          },
          {
              "id": 47,
              "name": "tank-0046-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(blue)/",
              "reachable": true
          },
          {
              "id": 48,
              "name": "tank-0047-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(blue)/",
              "reachable": true
          },
          {
              "id": 49,
              "name": "tank-0048-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(blue)/",
              "reachable": false
          },
          {
              "id": 50,
              "name": "tank-0049-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(blue)/",
              "reachable": true
          },
          {
              "id": 51,
              "name": "tank-0050-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(blue)/",
              "reachable": true
          },
          {
              "id": 52,
              "name": "tank-0051-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(blue)/",
              "reachable": true
          },
          {
              "id": 53,
              "name": "tank-0052-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(blue)/",
              "reachable": true
          },
          {
              "id": 54,
              "name": "tank-0053-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(blue)/",
              "reachable": true
          },
          {
              "id": 55,
              "name": "tank-0054-blue",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(blue)/",
              "reachable": true
          },
          {
              "id": 56,
              "name": "tank-0055-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(violet)/",
              "reachable": true
          },
          {
              "id": 57,
              "name": "tank-0056-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(violet)/",
              "reachable": true
          },
          {
              "id": 58,
              "name": "tank-0057-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(violet)/",
              "reachable": true
          },
          {
              "id": 59,
              "name": "tank-0058-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(violet)/",
              "reachable": true
          },
          {
              "id": 60,
              "name": "tank-0059-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(violet)/",
              "reachable": false
          },
          {
              "id": 61,
              "name": "tank-0060-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(violet)/",
              "reachable": true
          },
          {
              "id": 62,
              "name": "tank-0061-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(violet)/",
              "reachable": true
          },
          {
              "id": 63,
              "name": "tank-0062-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(violet)/",
              "reachable": true
          },
          {
              "id": 64,
              "name": "tank-0063-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(violet)/",
              "reachable": true
          },
          {
              "id": 65,
              "name": "tank-0064-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(violet)/",
              "reachable": true
          },
          {
              "id": 66,
              "name": "tank-0065-violet",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(violet)/",
              "reachable": true
          },
          {
              "id": 67,
              "name": "tank-0066-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(black)/",
              "reachable": true
          },
          {
              "id": 68,
              "name": "tank-0067-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(black)/",
              "reachable": true
          },
          {
              "id": 69,
              "name": "tank-0068-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(black)/",
              "reachable": true
          },
          {
              "id": 70,
              "name": "tank-0069-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(black)/",
              "reachable": true
          },
          {
              "id": 71,
              "name": "tank-0070-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(black)/",
              "reachable": false
          },
          {
              "id": 72,
              "name": "tank-0071-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(black)/",
              "reachable": true
          },
          {
              "id": 73,
              "name": "tank-0072-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(black)/",
              "reachable": true
          },
          {
              "id": 74,
              "name": "tank-0073-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(black)/",
              "reachable": true
          },
          {
              "id": 75,
              "name": "tank-0074-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(black)/",
              "reachable": true
          },
          {
              "id": 76,
              "name": "tank-0075-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(black)/",
              "reachable": true
          },
          {
              "id": 77,
              "name": "tank-0076-black",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(black)/",
              "reachable": true
          },
          {
              "id": 78,
              "name": "tank-0077-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(white)/",
              "reachable": true
          },
          {
              "id": 79,
              "name": "tank-0078-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(white)/",
              "reachable": true
          },
          {
              "id": 80,
              "name": "tank-0079-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(white)/",
              "reachable": true
          },
          {
              "id": 81,
              "name": "tank-0080-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(white)/",
              "reachable": true
          },
          {
              "id": 82,
              "name": "tank-0081-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(white)/",
              "reachable": false
          },
          {
              "id": 83,
              "name": "tank-0082-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(white)/",
              "reachable": true
          },
          {
              "id": 84,
              "name": "tank-0083-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(white)/",
              "reachable": true
          },
          {
              "id": 85,
              "name": "tank-0084-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(white)/",
              "reachable": true
          },
          {
              "id": 86,
              "name": "tank-0085-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(white)/",
              "reachable": true
          },
          {
              "id": 87,
              "name": "tank-0086-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(white)/",
              "reachable": true
          },
          {
              "id": 88,
              "name": "tank-0087-white",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(white)/",
              "reachable": true
          },
          {
              "id": 89,
              "name": "tank-0088-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(grey)/",
              "reachable": true
          },
          {
              "id": 90,
              "name": "tank-0089-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(grey)/",
              "reachable": true
          },
          {
              "id": 91,
              "name": "tank-0090-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(grey)/",
              "reachable": true
          },
          {
              "id": 92,
              "name": "tank-0091-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(grey)/",
              "reachable": true
          },
          {
              "id": 93,
              "name": "tank-0092-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(grey)/",
              "reachable": false
          },
          {
              "id": 94,
              "name": "tank-0093-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(grey)/",
              "reachable": true
          },
          {
              "id": 95,
              "name": "tank-0094-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(grey)/",
              "reachable": true
          },
          {
              "id": 96,
              "name": "tank-0095-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(grey)/",
              "reachable": true
          },
          {
              "id": 97,
              "name": "tank-0096-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(grey)/",
              "reachable": true
          },
          {
              "id": 98,
              "name": "tank-0097-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(grey)/",
              "reachable": true
          },
          {
              "id": 99,
              "name": "tank-0098-grey",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(grey)/",
              "reachable": true
          },
          {
              "id": 100,
              "name": "tank-0099-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/invalid-blocks:98.0.0(brown)/",
              "reachable": true
          },
          {
              "id": 101,
              "name": "tank-0100-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/no-mp-trim:96.0.0(brown)/",
              "reachable": true
          },
          {
              "id": 102,
              "name": "tank-0101-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/unknown-message:99.0.0(brown)/",
              "reachable": true
          },
          {
              "id": 103,
              "name": "tank-0102-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/5k-inv:94.0.0(brown)/",
              "reachable": true
          },
          {
              "id": 104,
              "name": "tank-0103-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
                      "status": "active",
                      "height": 0
                  }
              ],
              "last_changed_timestamp": 1728400080,
              "version": "/disabled-opcodes:95.0.0(brown)/",
              "reachable": false
          },
          {
              "id": 105,
              "name": "tank-0104-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/50-orphans:97.0.0(brown)/",
              "reachable": true
          },
          {
              "id": 106,
              "name": "tank-0105-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.20.0(brown)/",
              "reachable": true
          },
          {
              "id": 107,
              "name": "tank-0106-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.16.1(brown)/",
              "reachable": true
          },
          {
              "id": 108,
              "name": "tank-0107-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.17.0(brown)/",
              "reachable": true
          },
          {
              "id": 109,
              "name": "tank-0108-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.19.2(brown)/",
              "reachable": true
          },
          {
              "id": 110,
              "name": "tank-0109-brown",
              "description": "",
              "implementation": "Bitcoin Core",
              "tips": [
                  {
                      "hash": "00000329ff74f0312220f5064dae3afe98d9778606a0250ab71e8898e2011600",
                      "status": "active",
                      "height": 106
                  }
              ],
              "last_changed_timestamp": 1728403360,
              "version": "/Satoshi:0.21.1(brown)/",
              "reachable": true
          }
      ]
  }

const createNodeConfig = (data: any) => {
  const teamConfig =[] as any
  const lookup: Record<string, number> = {}
  data.nodes.forEach((node: any) => {
    const name = node.name;
    const isTeamNode = node.name.split('-').length === 3
    if (isTeamNode) {
      const [_tank, _id, team] = node.name.split('-')
      if (lookup[team] !== undefined) {
        const position = lookup[team]
        teamConfig[position].nodes.push(name)
      } else {
        teamConfig.push({
          name: team,
          nodes: [name]
        })
        lookup[team] = teamConfig.length - 1
      }
    }
    return;
  })
  fs.writeFileSync(JSON.stringify(teamConfig), "test-team.json", "utf-8")
}

createNodeConfig(data)
