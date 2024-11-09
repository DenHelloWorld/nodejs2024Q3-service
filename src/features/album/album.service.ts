import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from '../../core/db/db.service';
import { AlbumData } from './albumData.model';
import { Album } from './entities/album.entity';
import { validate } from 'uuid';

@Injectable()
export class AlbumService {
  @Inject(DbService) private readonly db: DbService;
  create(createAlbumDto: CreateAlbumDto): AlbumData {
    const album: Album = new Album({ ...createAlbumDto });

    this.db.getAlbums().push(album);

    return album;
  }

  findAll(): AlbumData[] {
    return this.db.getAlbums();
  }

  findOne(id: string): AlbumData {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }
    const album = this.db.getAlbums().find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException("The album with this id doesn't exist");
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumData {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }

    const album = this.findOne(id);

    Object.assign(album, { ...updateAlbumDto });

    return album;
  }

  remove(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid album ID. It must be a valid UUID.',
      );
    }
    const index = this.db.getAlbums().findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.db.getAlbums().splice(index, 1);
  }
}
