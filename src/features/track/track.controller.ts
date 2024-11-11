import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreatedTrackDto, CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Tracks')
@Controller('track')
@UsePipes(new ValidationPipe())
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Missing required fields in the request body.',
  })
  @ApiBody({
    description: 'The track data to create a new user.',
    type: CreateTrackDto,
  })
  @ApiCreatedResponse({
    type: CreatedTrackDto,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved tracks.',
    type: [CreatedTrackDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while retrieving tracks.',
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID of the track' })
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiResponse({
    status: 200,
    description: 'Track found.',
    type: CreatedTrackDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid track ID format (not a valid UUID).',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found with the provided ID.',
  })
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'The track data to update the track.',
    type: CreateTrackDto,
  })
  @ApiParam({ name: 'id', description: 'ID of the track' })
  @ApiOperation({ summary: 'Update track data' })
  @ApiResponse({
    status: 200,
    description: 'Track updated successfully.',
    type: CreatedTrackDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid track ID or missing data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found with the provided ID.',
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid track ID format (not a valid UUID).',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found with the provided ID.',
  })
  @ApiParam({ name: 'id', description: 'ID of the track' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
