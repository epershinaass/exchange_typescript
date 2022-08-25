import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from './schemas/account.schema';
import { codes, messages, ServiceError } from './errors/account.error';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import {
  AuthResponseDto,
  AuthTokenDto,
  CredentialsDto,
  MessageDto,
} from './dto/account.dto';
const crypto = require('crypto');

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private secret: string = this.configService.get('ACC_SECRET_KEY');
  private salt: string = this.configService.get('ACC_PASSW_SALT');
  private rolls = Number(this.configService.get('ACC_PASSW_ROLLS'));
  private keylen = 64; //Number(this.configService.get('ACC_KEYLEN'));
  private hashAlgorithm = 'sha256'; //this.configService.get('ACC_HASH_ALGORITHM');

  public async signIn(creds: CredentialsDto): Promise<AuthTokenDto> {
    const account = await this.accountModel.findOne({ login: creds.login });
    if (!account) throw new ServiceError(codes.NOT_FOUND);

    const passwordHash = await this.encode(creds.password);
    if (account?.password !== passwordHash)
      throw new ServiceError(codes.UNAUTHENTICATED);

    const payload = { username: account.login, sub: account._id };
    const token = this.jwtService.sign(payload);
    return new AuthTokenDto(token);
  }

  public async signUp(creds: CredentialsDto): Promise<MessageDto> {
    const account = await this.accountModel.findOne({ login: creds.login });
    if (account) throw new ServiceError(codes.ALREADY_EXISTS);

    const passwordHash = await this.encode(creds.password);
    const accountToSave = new CredentialsDto(creds.login, passwordHash);
    const AccountNotCreated = !(await this.accountModel.create(accountToSave));
    if (AccountNotCreated) throw new ServiceError(codes.ABORTED);

    return new MessageDto(messages.USER_CREATED);
  }

  public async verify(auth: AuthTokenDto): Promise<AuthResponseDto> {
    let authResponse: AuthResponseDto;
    try {
      const { sub, username } = this.jwtService.verify(auth.token, {
        secret: this.secret,
      });
      authResponse = new AuthResponseDto(sub, username);
    } catch (err) {
      throw new ServiceError(codes.UNAUTHENTICATED);
    }
    return authResponse;
  }

  public async encode(pwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        pwd,
        this.salt,
        this.rolls,
        this.keylen,
        this.hashAlgorithm,
        (err, key) => {
          if (err) reject(err);
          else resolve(key.toString('hex'));
        },
      );
    });
  }
}
