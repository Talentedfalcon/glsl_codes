#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

vec2 tile(vec2 st,vec2 scale){
    st*=scale;
    return fract(st);
}

vec2 rotate2D(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle)) * st;
    st+=0.5;
    return st;
}

vec2 scale2D(vec2 st,float scale){
    st-=0.5;
    st=mat2(scale,0,
            0,scale)*st;
    st+=0.5;
    return st;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.y;
    vec3 color=vec3(0.0);

    st=tile(st,vec2(10.));

    color+=vec3(solid_rect(st,vec2(0.5),0.92,0.92));
    
    float diamond1,diamond2;
    float shift=0.5;
    for(int i=0;i<2;i++){
        float mult1=1.;
        if(i==1){
            mult1=-1.;
        }
        for(int j=0;j<2;j++){
            float mult2=1.;
            if(j==1){
                mult2=-1.;
            }
            st+=vec2(mult1*shift,mult2*shift);
            st=rotate2D(st,PI*0.25);
            diamond1=solid_rect(st,vec2(0.5),0.3,0.3);
            diamond2=solid_rect(st,vec2(0.5),0.2,0.2);
            color+=vec3(2.*diamond2-diamond1);
            st=rotate2D(st,-PI*0.25);
            st-=vec2(mult1*shift,mult2*shift);
        }
    }

    gl_FragColor=vec4(color,1.0);
}