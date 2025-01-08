import { Provider, Contract, Account, ec, json } from 'starknet';
import fs from 'fs';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// 配置 StarkNet 的 Provider
const provider = new Provider({ network: 'goerli-alpha' });

// 从环境变量中读取私钥和账户地址
const privateKey = process.env.PRIVATE_KEY || '';
const accountAddress = process.env.ACCOUNT_ADDRESS || '';

// 创建账户对象
const account = new Account(provider, accountAddress, privateKey);

// 部署合约
async function deployContract() {
  // 读取编译后的合约文件
  const compiledContract = json.parse(
    fs.readFileSync('artifacts/MyContract.json').toString('ascii')
  );

  // 部署合约
  const deployResponse = await account.deployContract({
    contract: compiledContract,
  });

  console.log('Contract deployed at:', deployResponse.contract_address);
}

deployContract();