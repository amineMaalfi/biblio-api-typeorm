import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LibrarianGuard } from '../auth/librarian.guard';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /** Public catalog for the storefront. */
  @Get()
  async findAllPublic() {
    const books = await this.booksService.findAll();
    return books.map((b) => this.booksService.toPublic(b));
  }

  @Get(':id')
  async findOnePublic(@Param('id', ParseUUIDPipe) id: string) {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException('Livre introuvable.');
    }
    return this.booksService.toPublic(book);
  }

  @Post()
  @UseGuards(JwtAuthGuard, LibrarianGuard)
  async create(@Body() dto: CreateBookDto) {
    const book = await this.booksService.create(dto);
    return this.booksService.toPublic(book);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, LibrarianGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBookDto,
  ) {
    const book = await this.booksService.update(id, dto);
    return this.booksService.toPublic(book);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, LibrarianGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.booksService.remove(id);
    return { deleted: true };
  }
}
