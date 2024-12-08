import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  text: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdatePostDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  text: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
