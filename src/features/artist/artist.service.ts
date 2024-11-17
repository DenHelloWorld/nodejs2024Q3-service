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
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
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

    Object.assign(artist, { ...updateArtistDto });
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

    const tracks = await this.trackRepository.find({
      where: { artistId: id },
    });
    for (const track of tracks) {
      track.artistId = null;
      await this.trackRepository.save(track);
    }
    const albums = await this.albumRepository.find({
      where: { artistId: id },
    });
    for (const album of albums) {
      album.artistId = null;
      await this.albumRepository.save(album);
    }
    await this.artistRepository.remove(artistToRemove);
  }
}
