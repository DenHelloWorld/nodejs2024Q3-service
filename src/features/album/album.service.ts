import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumData } from './albumData.model';
import { Album } from './entities/album.entity';
import { validate } from 'uuid';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    readonly trackRepository: Repository<Track>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumData> {
    const album: Album = new Album({ ...createAlbumDto });

    await this.albumRepository.save(album);
    return album;
  }

  async findAll(): Promise<AlbumData[]> {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string): Promise<AlbumData> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }
    const album = await this.albumRepository.findOne({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException("The album with this id doesn't exist");
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumData> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }

    const album = await this.albumRepository.findOne({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException("The album with this id doesn't exist");
    }

    Object.assign(album, { ...updateAlbumDto });
    await this.albumRepository.save(album);

    return album;
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }

    const albumToRemove = await this.albumRepository.findOne({
      where: {
        id,
      },
    });

    if (!albumToRemove) {
      throw new NotFoundException("The album with this id doesn't exist");
    }

    const tracks = await this.trackRepository.find({
      where: { albumId: id },
    });
    for (const track of tracks) {
      track.albumId = null;
      await this.trackRepository.save(track);
    }

    await this.albumRepository.remove(albumToRemove);
  }
}
