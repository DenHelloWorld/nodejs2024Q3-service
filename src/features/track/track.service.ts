import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { validate } from 'uuid';
import { TrackData } from './trackData.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    readonly trackRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto): Promise<TrackData> {
    const track: Track = new Track(createTrackDto);

    await this.trackRepository.save(track);
    return track;
  }

  async findAll(): Promise<TrackData[]> {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findOne(id: string): Promise<TrackData> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException("The track with this id doesn't exist");
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackData> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException("The track with this id doesn't exist");
    }

    Object.assign(track, { ...updateTrackDto });

    await this.trackRepository.save(track);

    return track;
  }

  async remove(id: string): Promise<void> {
    if (!validate(id)) {
      throw new BadRequestException(
        'Invalid track ID. It must be a valid UUID.',
      );
    }

    const trackToRemove = await this.findOne(id);

    if (!trackToRemove) {
      throw new NotFoundException("The track with this id doesn't exist");
    }

    await this.trackRepository.remove(trackToRemove);
  }
}
