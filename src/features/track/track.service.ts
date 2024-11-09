import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4, validate } from 'uuid';
import { TrackData } from './trackData.model';

@Injectable()
export class TrackService {
  private tracks: Track[] = [
    new Track({
      id: uuidv4(),
      name: 'First Track',
      duration: 1,
    }),
    new Track({
      id: uuidv4(),
      name: 'Second Track',
      duration: 1,
    }),
  ];
  create(createTrackDto: CreateTrackDto): TrackData {
    const track: Track = new Track({
      id: uuidv4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
    });
    this.tracks.push(track);

    return track;
  }

  findAll(): TrackData[] {
    return this.tracks;
  }

  findOne(id: string): TrackData {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException("The track with this id doesn't exist");
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackData {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }

    const track = this.findOne(id);

    Object.assign(track, { ...updateTrackDto });

    return track;
  }

  remove(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.splice(index, 1);
  }

  removeArtistFromTracks(id: string): void {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }
}
