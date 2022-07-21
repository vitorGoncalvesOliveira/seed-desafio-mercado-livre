import { IsNumber, IsString, Length, Min, MinLength } from 'class-validator';
export class ProductCreateDTO {
  @Length(1)
  @IsString()
  name: string;

  @Min(0)
  @IsNumber()
  value: number;

  @IsNumber()
  @Min(0)
  amount: number;

  @MinLength(2, {
    each: true,
  })
  characters: string[];

  @Length(1, 1000)
  @IsString()
  detail: string;

  @IsString()
  category: string;

  user_id: number;
}
