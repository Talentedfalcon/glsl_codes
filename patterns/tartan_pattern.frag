#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 tile(vec2 st,vec2 scale){
    st*=scale;
    return fract(st);
}

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

vec2 rotate2D(vec2 st,float angle){
    st-=0.5;
    st=mat2(cos(angle),-sin(angle),
            sin(angle),cos(angle)) * st;
    st+=0.5;
    return st;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.y;
    vec3 color=vec3(0.5);
    float grid_size=8.;
    st=rotate2D(st,PI*u_time/10.);

    vec2 vert_st=tile(st,vec2(grid_size));
    float white_vert=solid_rect(vert_st,vec2(0.15,0.5),0.1,1.0)+
                    solid_rect(vert_st,vec2(0.35,0.5),0.1,1.0);
    float black_vert=solid_rect(vert_st,vec2(0.05,0.5),0.1,1.0)+
                    solid_rect(vert_st,vec2(0.25,0.5),0.1,1.0)+
                    solid_rect(vert_st,vec2(0.45,0.5),0.1,1.0);
    color+=vec3(white_vert-black_vert);

    vec2 horz_st=tile(st,vec2(grid_size));
    float white_horz=solid_rect(horz_st,vec2(0.5,0.15),1.0,0.1)+
                    solid_rect(horz_st,vec2(0.5,0.35),1.0,0.1);
    float black_horz=solid_rect(horz_st,vec2(0.5,0.05),1.0,0.1)+
                    solid_rect(horz_st,vec2(0.5,0.25),1.0,0.1)+
                    solid_rect(horz_st,vec2(0.5,0.45),1.0,0.1);
    color+=vec3(white_horz-black_horz);

    vec2 red_st=tile(st,vec2(2.*grid_size));
    float red_horz=clamp(solid_rect(red_st,vec2(0.5),1.0,0.1)-black_horz,0.,1.);
    float red_vert=clamp(solid_rect(red_st,vec2(0.5),0.1,1.0)-black_vert,0.,1.);
    color=(color-(color*vec3(red_vert+red_horz)*0.7))+vec3((red_horz+red_vert),0.,0.);

    gl_FragColor=vec4(color,1.0);
}