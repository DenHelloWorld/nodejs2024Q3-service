import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { validate } from 'uuid';
import { ArtistData } from './artistData.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistData> {
    const artist: Artist = new Artist({ ...createArtistDto });

    await this.artistRepository.save(artist);
    return artist;
  }

  async findAll(): Promise<ArtistData[]> {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }

    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException("The artist with this id doesn't exist");
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }

    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException("The artist with this id doesn't exist");
    }

    if (updateArtistDto.name) {
      artist.name = updateArtistDto.name;
    }

    if (updateArtistDto.grammy !== undefined) {
      artist.grammy = updateArtistDto.grammy;
    }

    await this.artistRepository.save(artist);

    return artist;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid artist ID. It must be a valid UUID.',
      );
    }

    const artistToRemove = await this.findOne(id);

    if (!artistToRemove) {
      throw new NotFoundException("The artist with this id doesn't exist");
    }
    await this.artistRepository.remove(artistToRemove);
  }
}
