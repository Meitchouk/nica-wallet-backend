import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Check API health status' })
  @ApiResponse({ 
    status: 200, 
    description: 'API is healthy',
    schema: {
      example: {
        status: 'ok',
        database: 'connected',
        timestamp: '2024-09-14T22:30:00.000Z'
      }
    }
  })
  async checkHealth() {
    const isDatabaseConnected = this.prismaService.isDatabaseConnected();
    
    return {
      status: 'ok',
      database: isDatabaseConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
      message: isDatabaseConnected 
        ? 'API is running with database connection' 
        : 'API is running without database connection (limited functionality)'
    };
  }
}
