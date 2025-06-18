import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { AcademyYearService } from '../services/academy-year.service';
import { CreateAcademyYearDTO } from '../dto/createAcademyYearDTO';

@Controller('api/private/academy-year')
export class AcademyYearController {
  constructor(private academyYearService: AcademyYearService) {}

  @Post()
  async createAcademyYear(@Res() res, @Body() createAcademyYearDTO: CreateAcademyYearDTO) {
    try {
      const newYear = await this.academyYearService.createAcademyYear(createAcademyYearDTO);
      return res.status(201).json({ message: 'Academy year created', academyYear: newYear });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating academy year', error: error.message });
    }
  }

  @Get()
  async getAllAcademyYears(@Res() res) {
    try {
      const years = await this.academyYearService.getAllAcademyYears();
      return res.status(200).json({ message: 'Academy years retrieved', academyYears: years });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving academy years', error: error.message });
    }
  }

  @Get(':id')
  async getAcademyYearById(@Res() res, @Param('id') id: string) {
    try {
      const year = await this.academyYearService.getAcademyYearById(id);
      if (!year) {
        return res.status(404).json({ message: 'Academy year not found' });
      }
      return res.status(200).json({ message: 'Academy year retrieved', academyYear: year });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving academy year', error: error.message });
    }
  }

  @Put(':id')
  async updateAcademyYear(@Res() res, @Param('id') id: string, @Body() updateData: Partial<CreateAcademyYearDTO>) {
    try {
      const updated = await this.academyYearService.updateAcademyYear(id, updateData);
      if (!updated) {
        return res.status(404).json({ message: 'Academy year not found' });
      }
      return res.status(200).json({ message: 'Academy year updated', academyYear: updated });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating academy year', error: error.message });
    }
  }

  @Put(':id/set-active')
  async setAcademyYearActive(@Res() res, @Param('id') id: string) {
    try {
      const updated = await this.academyYearService.setAcademyYearActive(id);
      if (!updated) {
        return res.status(404).json({ message: 'Academy year not found' });
      }
      return res.status(200).json({ message: 'Academy year set as active', academyYear: updated });
    } catch (error) {
      return res.status(500).json({ message: 'Error setting academy year active', error: error.message });
    }
  }

  @Get('active')
  async getActiveAcademyYear(@Res() res) {
    try {
      const active = await this.academyYearService.getActiveAcademyYear();
      if (!active) {
        return res.status(404).json({ message: 'No active academy year found' });
      }
      return res.status(200).json({ message: 'Active academy year retrieved', academyYear: active });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving active academy year', error: error.message });
    }
  }

}
