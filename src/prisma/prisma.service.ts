import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);
    private isConnected = false;

    async onModuleInit() {
        // TEMPORALMENTE DESHABILITADO - Descomenta cuando tengas base de datos
        this.logger.warn('Database connection is DISABLED. Running without database.');
        return;
        
        /* Descomenta este bloque cuando tengas base de datos lista
        try {
            await this.$connect();
            this.isConnected = true;
            this.logger.log('Database connection established successfully');
        } catch (error) {
            this.logger.error('Failed to connect to database. Running without database connection.', error.message);
            this.isConnected = false;
        }
        */
    }

    async onModuleDestroy() {
        // TEMPORALMENTE DESHABILITADO - Descomenta cuando tengas base de datos
        /* Descomenta este bloque cuando tengas base de datos lista
        if (this.isConnected) {
            await this.$disconnect();
        }
        */
    }

    async enableShutdownHooks(app) {
        process.on('SIGTERM', () => {
            console.info('SIGTERM signal received.');
            this.onModuleDestroy();
            app.close();
        });
    }

    // Método helper para verificar si la BD está conectada
    isDatabaseConnected(): boolean {
        return this.isConnected;
    }
}
